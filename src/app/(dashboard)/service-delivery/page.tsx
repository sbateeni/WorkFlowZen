'use client'

import { PageHeader } from '@/components/shared/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';

const serviceRequests = [
    { id: 'SR-001', service: 'Website Design', client: 'Alpha Corp', status: 'In Progress', requestDate: '2024-05-01' },
    { id: 'SR-002', service: 'Social Media Campaign', client: 'Beta LLC', status: 'In Progress', requestDate: '2024-05-15' },
    { id: 'SR-003', service: 'IT Support Contract', client: 'Gamma Inc.', status: 'Completed', requestDate: '2024-04-20' },
];

export default function ServiceDeliveryPage() {
    const { toast } = useToast();

    const handleConfirm = (requestId: string) => {
        toast({
            title: `Service Delivered: ${requestId}`,
            description: 'The service delivery has been confirmed and recorded.',
            variant: 'default',
            className: 'bg-accent text-accent-foreground border-accent',
        })
    }
  
  return (
    <>
      <PageHeader
        title="Service Delivery"
        description="Confirm the delivery of services to clients or departments."
        className="mb-8"
      />
      <Card>
          <CardHeader>
              <CardTitle>Active Service Requests</CardTitle>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Request ID</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {serviceRequests.map(req => (
                          <TableRow key={req.id}>
                              <TableCell className="font-medium">{req.id}</TableCell>
                              <TableCell>{req.service}</TableCell>
                              <TableCell>{req.client}</TableCell>
                              <TableCell>
                                <Badge variant={req.status === 'Completed' ? 'secondary' : 'default'} className={req.status === 'Completed' ? '' : 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30'}>
                                    {req.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleConfirm(req.id)} 
                                    disabled={req.status === 'Completed'}
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Confirm Delivery
                                </Button>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
      </Card>
    </>
  );
}
