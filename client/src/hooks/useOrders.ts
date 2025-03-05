
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: string | null;
  delivery_notes: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: {
    name: string;
    sku: string;
  };
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;

        const ordersWithItems: Order[] = [];

        for (const order of ordersData || []) {
          const { data: orderItems, error: itemsError } = await supabase
            .from('order_items')
            .select(`
              id,
              order_id,
              product_id,
              quantity,
              price,
              product:product_id (
                name,
                sku
              )
            `)
            .eq('order_id', order.id);

          if (itemsError) throw itemsError;

          // Cast the order status to the appropriate type
          const status = order.status as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          
          ordersWithItems.push({
            ...order,
            status,
            items: orderItems || []
          });
        }

        setOrders(ordersWithItems);
      } catch (err: any) {
        console.error('Error fetching orders:', err);
        setError(err.message || 'Failed to fetch orders data');
        toast({
          title: 'Error',
          description: 'Failed to fetch orders data. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [toast]);

  return { orders, isLoading, error };
}
