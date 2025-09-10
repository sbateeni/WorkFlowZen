'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const formLabels = {
  en: {
    title: 'Consultation Request',
    description: 'Fill out the form below to send an email inquiry.',
    name: 'Your Name',
    namePlaceholder: 'Enter your name',
    email: 'Your Email',
    emailPlaceholder: 'Enter your email address',
    subject: 'Subject',
    subjectPlaceholder: 'What is this regarding?',
    message: 'Message',
    messagePlaceholder: 'Type your message here.',
    submit: 'Send Request',
    successTitle: 'Request Sent',
    successDescription: 'Your consultation request has been sent successfully.',
  },
  ar: {
    title: 'طلب استشارة',
    description: 'املأ النموذج أدناه لإرسال استفسار عبر البريد الإلكتروني.',
    name: 'الاسم',
    namePlaceholder: 'أدخل اسمك',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'أدخل عنوان بريدك الإلكتروني',
    subject: 'الموضوع',
    subjectPlaceholder: 'بخصوص ماذا؟',
    message: 'الرسالة',
    messagePlaceholder: 'اكتب رسالتك هنا.',
    submit: 'إرسال الطلب',
    successTitle: 'تم إرسال الطلب',
    successDescription: 'تم إرسال طلب الاستشارة الخاص بك بنجاح.',
  },
};

export function ConsultationForm() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically handle form submission, e.g., send an email
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{formLabels[lang].name}</Label>
              <Input id="name" placeholder={formLabels[lang].namePlaceholder} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{formLabels[lang].email}</Label>
              <Input id="email" type="email" placeholder={formLabels[lang].emailPlaceholder} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">{formLabels[lang].subject}</Label>
            <Input id="subject" placeholder={formLabels[lang].subjectPlaceholder} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{formLabels[lang].message}</Label>
            <Textarea id="message" placeholder={formLabels[lang].messagePlaceholder} required rows={6} />
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
