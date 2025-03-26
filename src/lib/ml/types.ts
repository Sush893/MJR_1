```typescript
/**
 * ML Type Definitions
 * 
 * Define interfaces for recommendation data structures.
 * Update these types to match your ML model's output.
 */

export interface StartupRecommendation {
  id: string;
  title: string;
  description: string;
  matchScore: number;
  tags: string[];
  industry: string;
}

export interface CoFounderMatch {
  userId: string;
  name: string;
  role: string;
  matchScore: number;
  sharedInterests: string[];
  skills: string[];
}

export interface UserPreferences {
  interests: string[];
  skills: string[];
  industry: string;
  role: string;
  stage: 'idea' | 'mvp' | 'growth';
}
```