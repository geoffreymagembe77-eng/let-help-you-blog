import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, Building2, User } from 'lucide-react';

export const AuthPage = ({ onLogin }: { onLogin: (role: 'patient' | 'provider') => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-emerald-600 p-3 rounded-xl mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">GembeEduPro</h1>
          <p className="text-slate-500">Multilingual Patient Education</p>
        </div>

        <Card className="border-slate-200 shadow-xl">
          <Tabs defaultValue="patient">
            <CardHeader>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="patient" className="flex items-center gap-2">
                  <User className="w-4 h-4" /> Patient
                </TabsTrigger>
                <TabsTrigger value="provider" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Institution
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button className="text-xs text-emerald-600 font-medium hover:underline">Forgot password?</button>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>

            <TabsContent value="patient">
              <CardFooter className="flex flex-col gap-4">
                <Button onClick={() => onLogin('patient')} className="w-full bg-emerald-600 hover:bg-emerald-700 h-11">
                  Login as Patient
                </Button>
                <p className="text-center text-sm text-slate-500">
                  Don't have an account? <button className="text-emerald-600 font-bold hover:underline">Sign up</button>
                </p>
              </CardFooter>
            </TabsContent>

            <TabsContent value="provider">
              <CardFooter className="flex flex-col gap-4">
                <Button onClick={() => onLogin('provider')} className="w-full bg-emerald-600 hover:bg-emerald-700 h-11">
                  Login as Healthcare Provider
                </Button>
                <p className="text-center text-sm text-slate-500">
                  Interested in GembeEduPro for your hospital? <button className="text-emerald-600 font-bold hover:underline">Contact Sales</button>
                </p>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="mt-8 flex justify-center gap-6 text-xs text-slate-400">
          <a href="#" className="hover:text-slate-600">Privacy</a>
          <a href="#" className="hover:text-slate-600">Terms</a>
          <a href="#" className="hover:text-slate-600">Contact Support</a>
        </div>
      </motion.div>
    </div>
  );
};