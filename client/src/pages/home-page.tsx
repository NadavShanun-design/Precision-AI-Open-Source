import { useAuth } from "@/hooks/use-auth";
import { PatientForm } from "@/components/patient-form";
import { TreatmentRecommendations } from "@/components/treatment-recommendations";
import { AIChat } from "@/components/ai-chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";
import { Patient } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  const { data: patients, isLoading: patientsLoading } = useQuery<Patient[]>({
    queryKey: ["/api/patients"],
  });

  const addPatientMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/patients", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/patients"] });
    },
  });

  const recommendTreatmentMutation = useMutation({
    mutationFn: async (patientId: number) => {
      const patient = patients?.find((p) => p.id === patientId);
      if (!patient) throw new Error("Patient not found");

      const res = await apiRequest("POST", "/api/treatments/recommend", {
        patientId,
        ...patient,
      });
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">PrecisionMed AI</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.username}</span>
            <Button variant="outline" onClick={() => logoutMutation.mutate()}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Add New Patient</CardTitle>
              </CardHeader>
              <CardContent>
                <PatientForm onSubmit={(data) => addPatientMutation.mutate(data)} />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Patient List & Treatment Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                {patientsLoading ? (
                  <div className="flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : patients?.length === 0 ? (
                  <p>No patients added yet</p>
                ) : (
                  <Tabs defaultValue={patients?.[0]?.id.toString()}>
                    <TabsList className="w-full">
                      {patients?.map((patient) => (
                        <TabsTrigger key={patient.id} value={patient.id.toString()}>
                          {patient.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {patients?.map((patient) => (
                      <TabsContent key={patient.id} value={patient.id.toString()}>
                        <div className="space-y-4">
                          <Button
                            onClick={() => recommendTreatmentMutation.mutate(patient.id)}
                            disabled={recommendTreatmentMutation.isPending}
                          >
                            Generate Recommendations
                          </Button>
                          {recommendTreatmentMutation.data?.recommendations?.recommendations && (
                            <TreatmentRecommendations
                              recommendations={recommendTreatmentMutation.data.recommendations.recommendations}
                            />
                          )}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                )}
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <AIChat />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}