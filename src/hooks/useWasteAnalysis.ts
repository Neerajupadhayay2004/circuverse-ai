import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface AnalysisResult {
  wasteType: string;
  recyclability: number;
  products: string[];
  co2Saved: number;
  energySaved: number;
  circularScore: number;
  smartCityApplications: string[];
  description: string;
  processingSteps?: string[];
  environmentalImpact?: string;
}

export function useWasteAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const analyzeWaste = async (wasteInput: string): Promise<AnalysisResult> => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('analyze-waste', {
        body: { 
          wasteInput, 
          userId: user?.id || null 
        },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const result: AnalysisResult = {
        wasteType: data.wasteType || 'Unknown Waste',
        recyclability: data.recyclability || 75,
        products: data.products || ['Recycled Materials'],
        co2Saved: data.co2Saved || 0,
        energySaved: data.energySaved || 0,
        circularScore: data.circularScore || 50,
        smartCityApplications: data.smartCityApplications || ['Sustainable Infrastructure'],
        description: data.description || 'Analysis complete.',
        processingSteps: data.processingSteps,
        environmentalImpact: data.environmentalImpact,
      };

      setAnalysis(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analyzeWaste, analysis, isAnalyzing, error, setAnalysis };
}
