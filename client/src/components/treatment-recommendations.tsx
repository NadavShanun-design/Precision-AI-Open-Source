import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

type Recommendation = {
  treatment: string;
  efficacy: number;
  rationale: string;
};

export function TreatmentRecommendations({
  recommendations
}: {
  recommendations: Recommendation[];
}) {
  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              {rec.treatment}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Efficacy:</span>
                <Progress value={rec.efficacy * 100} className="flex-1" />
                <span className="text-sm">{Math.round(rec.efficacy * 100)}%</span>
              </div>
              <p className="text-sm text-muted-foreground">{rec.rationale}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
