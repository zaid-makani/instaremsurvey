'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StarsRating } from '@/components/ui/stars-rating';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Send, ArrowRight, ArrowLeft } from 'lucide-react';

interface SurveyData {
  easeOfUse: number;
  transactionSpeed: number;
  overallSatisfaction: number;
  quickSendUsability: string;
  fxRates: string;
  customerSupport: number;
  appPerformance: number;
  recommendApp: string;
  preferredFeatures: string[];
  additionalFeedback: string;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    easeOfUse: 0,
    transactionSpeed: 0,
    overallSatisfaction: 0,
    quickSendUsability: '',
    fxRates: '',
    customerSupport: 0,
    appPerformance: 0,
    recommendApp: '',
    preferredFeatures: [],
    additionalFeedback: ''
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Survey Data:', surveyData);
    setIsSubmitted(true);
  };

  const updateSurveyData = (field: keyof SurveyData, value: any) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setSurveyData(prev => ({
      ...prev,
      preferredFeatures: prev.preferredFeatures.includes(feature)
        ? prev.preferredFeatures.filter(f => f !== feature)
        : [...prev.preferredFeatures, feature]
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your feedback helps us improve our remittance services and provide you with the best experience.
            </p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Submit Another Response
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Experience Survey</h1>
          <p className="text-gray-600">Help us improve your remittance experience</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-600" />
              {currentStep === 1 && "User Experience"}
              {currentStep === 2 && "Transaction Features"}
              {currentStep === 3 && "Support & Performance"}
              {currentStep === 4 && "Final Thoughts"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: User Experience */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    How easy is our app to use?
                  </Label>
                  <StarsRating
                    rating={surveyData.easeOfUse}
                    onRatingChange={(rating) => updateSurveyData('easeOfUse', rating)}
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">
                    How satisfied are you with transaction speed?
                  </Label>
                  <StarsRating
                    rating={surveyData.transactionSpeed}
                    onRatingChange={(rating) => updateSurveyData('transactionSpeed', rating)}
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Overall app satisfaction
                  </Label>
                  <StarsRating
                    rating={surveyData.overallSatisfaction}
                    onRatingChange={(rating) => updateSurveyData('overallSatisfaction', rating)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Transaction Features */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    How would you rate our Quick Send feature?
                  </Label>
                  <Select onValueChange={(value) => updateSurveyData('quickSendUsability', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent - Very intuitive</SelectItem>
                      <SelectItem value="good">Good - Easy to use</SelectItem>
                      <SelectItem value="average">Average - Okay experience</SelectItem>
                      <SelectItem value="poor">Poor - Difficult to use</SelectItem>
                      <SelectItem value="not-used">Haven't used it yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Are you satisfied with our foreign exchange rates?
                  </Label>
                  <RadioGroup
                    value={surveyData.fxRates}
                    onValueChange={(value) => updateSurveyData('fxRates', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="very-competitive" id="very-competitive" />
                      <Label htmlFor="very-competitive">Very competitive rates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="competitive" id="competitive" />
                      <Label htmlFor="competitive">Competitive rates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="average" id="average-rates" />
                      <Label htmlFor="average-rates">Average rates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="expensive" id="expensive" />
                      <Label htmlFor="expensive">Could be better</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 3: Support & Performance */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Customer support experience
                  </Label>
                  <StarsRating
                    rating={surveyData.customerSupport}
                    onRatingChange={(rating) => updateSurveyData('customerSupport', rating)}
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">
                    App performance and loading times
                  </Label>
                  <StarsRating
                    rating={surveyData.appPerformance}
                    onRatingChange={(rating) => updateSurveyData('appPerformance', rating)}
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Which features do you use most? (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Quick Send', 'Transaction History', 'Rate Alerts', 'Fingerprint/Face ID', 'Instapoints', 'Dark Mode'].map((feature) => (
                      <Label key={feature} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={surveyData.preferredFeatures.includes(feature)}
                          onChange={() => toggleFeature(feature)}
                          className="rounded"
                        />
                        <span className="text-sm">{feature}</span>
                      </Label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Final Thoughts */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Would you recommend our app to others?
                  </Label>
                  <RadioGroup
                    value={surveyData.recommendApp}
                    onValueChange={(value) => updateSurveyData('recommendApp', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="definitely" id="definitely" />
                      <Label htmlFor="definitely">Definitely</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="probably" id="probably" />
                      <Label htmlFor="probably">Probably</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="maybe" />
                      <Label htmlFor="maybe">Maybe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unlikely" id="unlikely" />
                      <Label htmlFor="unlikely">Unlikely</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="feedback" className="text-base font-medium mb-3 block">
                    Additional feedback or suggestions (Optional)
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us what we can improve or what you love about our service..."
                    value={surveyData.additionalFeedback}
                    onChange={(e) => updateSurveyData('additionalFeedback', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={handleNext} className="flex items-center gap-2">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                  Submit Survey
                  <CheckCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Your privacy is important to us. This survey is anonymous and secure.</p>
        </div>
      </div>
    </div>
  );
}