import { toast } from '@/components/ui/use-toast';
import agent from '@/services/agent';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useDataManager() {
  const pollIntervalRef = useRef<NodeJS.Timeout>();
  const [isPolling, setIsPolling] = useState(false);
  const [status, setStatus] = useState<
    'DONE' | 'IN_PROGRESS' | 'ERROR' | undefined
  >(undefined);

  const [progressResult, setProgressResult] = useState<
    { status: string; id: string; done_at: string } | undefined
  >(undefined);

  const fetchData = async (id: string) => {
    setStatus(undefined);
    setIsPolling(true);
    try {
      const result = await agent.Data.get(id);

      if (result) {
        const { status } = result;
        setStatus(status);

        switch (status) {
          case 'DONE':
            setProgressResult(undefined);
            break;

          case 'IN_PROGRESS':
            setProgressResult(result);

            break;
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error occurred while saving',
        description: JSON.stringify(error, null, 2)
      });
      setStatus('ERROR');
    } finally {
      setIsPolling(false);
    }
  };

  const saveData = useCallback(async (csvData: any) => {
    if (!csvData) return;
    try {
      const result = await agent.Data.save(csvData);

      if (result) {
        switch (result.status) {
          case 'DONE':
            toast({
              title: 'Success',
              description: 'Data saved successfully'
            });

            break;

          case 'IN_PROGRESS':
            setProgressResult(result);
            toast({
              title: 'Saving in progress'
            });
            break;
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred while saving data.'
      });
      saveData(csvData);
      setStatus('ERROR');
    }
  }, []);

  const startPolling = useCallback(() => {
    if (!progressResult?.id) return;
    pollIntervalRef.current = setInterval(async () => {
      await fetchData(progressResult.id);

      if (status !== 'IN_PROGRESS') {
        clearInterval(pollIntervalRef.current);
      }
    }, 5000);
  }, [progressResult?.id, status]);

  useEffect(() => {
    startPolling();

    return () => {
      clearInterval(pollIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressResult]);

  return {
    isPolling,
    saveData
  };
}
