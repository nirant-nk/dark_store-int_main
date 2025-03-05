
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface InventoryItem {
  id: string;
  product_id: string;
  quantity: number;
  location: string;
  min_stock_level: number;
  max_stock_level: number;
  expiry_date: string | null;
  batch_number: string | null;
  product: {
    name: string;
    sku: string;
    category: string;
  };
}

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('inventory')
          .select(`
            id,
            product_id,
            quantity,
            location,
            min_stock_level,
            max_stock_level,
            expiry_date,
            batch_number,
            product:product_id (
              name,
              sku,
              category
            )
          `);

        if (error) {
          throw error;
        }

        setInventory(data || []);
      } catch (err: any) {
        console.error('Error fetching inventory:', err);
        setError(err.message || 'Failed to fetch inventory data');
        toast({
          title: 'Error',
          description: 'Failed to fetch inventory data. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, [toast]);

  return { inventory, isLoading, error };
}
