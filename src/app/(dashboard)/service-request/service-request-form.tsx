'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Send, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formLabels = {
  en: {
    title: 'New Service Request',
    description: 'Fill out the form to request a new service.',
    serviceType: 'Service Type',
    serviceTypePlaceholder: 'Select a service type',
    marketing: 'Marketing',
    design: 'Graphic Design',
    development: 'Web Development',
    other: 'Other',
    descriptionLabel: 'Detailed Description',
    descriptionPlaceholder: 'Describe the service requirements in detail...',
    attachments: 'Attachments',
    submit: 'Submit Request',
    successTitle: 'Request Submitted',
    successDescription: 'Your service request has been submitted successfully.',
  },
  ar: {
    title: 'طلب خدمة جديد',
    description: 'املأ النموذج لطلب خدمة جديدة.',
    serviceType: 'نوع الخدمة',
    serviceTypePlaceholder: 'اختر نوع الخدمة',
    marketing: 'تسويق',
    design: 'تصميم جرافيك',
    development: 'تطوير ويب',
    other: 'أخرى',
    descriptionLabel: 'وصف تفصيلي',
    descriptionPlaceholder: 'صف متطلبات الخدمة بالتفصيل...',
    attachments: 'المرفقات',
    submit: 'إرسال الطلب',
    successTitle: 'تم تقديم الطلب',
    successDescription: 'تم تقديم طلب الخدمة الخاص بك بنجاح.',
  },
};

export function ServiceRequestForm() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: formLabels[lang].successTitle,
      description: formLabels[lang].successDescription,
      variant: 'default',
      className: 'bg-accent text-accent-foreground border-accent',
    });
    (event.target as HTMLFormElement).reset();
  };
  
  return (
    <Card className="w-full" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{formLabels[lang].title}</CardTitle>
                <CardDescription>{formLabels[lang].description}</CardDescription>
            </div>
            <Tabs defaultValue="en" onValueChange={(value) => setLang(value as 'en' | 'ar')}>
                <TabsList>
                    <TabsTrigger value="en">EN</TabsTrigger>
                    <TabsTrigger value="ar">AR</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label>{formLabels[lang].serviceType}</Label>
                <Select dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                    <SelectTrigger>
                        <SelectValue placeholder={formLabels[lang].serviceTypePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="marketing">{formLabels[lang].marketing}</SelectItem>
                        <SelectItem value="design">{formLabels[lang].design}</SelectItem>
                        <SelectItem value="development">{formLabels[lang].development}</SelectItem>
                        <SelectItem value="other">{formLabels[lang].other}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">{formLabels[lang].descriptionLabel}</Label>
                <Textarea id="description" placeholder={formLabels[lang].descriptionPlaceholder} required rows={6} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="attachments">{formLabels[lang].attachments}</Label>
                 <div className="flex items-center justify-center w-full">
                    <Label htmlFor="attachments" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-muted-foreground"/>
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PDF, DOCX, ZIP (MAX. 25MB)</p>
                        </div>
                        <Input id="attachments" type="file" className="hidden" multiple />
                    </Label>
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">
            <Send className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
            {formLabels[lang].submit}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
