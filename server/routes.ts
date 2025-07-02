import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { generateTreatmentRecommendations, getAIChatResponse } from "./openai";
import { insertPatientSchema, insertTreatmentSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Protected routes middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // Patient routes
  app.get("/api/patients", requireAuth, async (req, res) => {
    const patients = await storage.listPatients();
    res.json(patients);
  });

  app.post("/api/patients", requireAuth, async (req, res) => {
    const validation = insertPatientSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid patient data" });
    }
    const patient = await storage.createPatient(validation.data);
    res.status(201).json(patient);
  });

  app.get("/api/patients/:id/treatments", requireAuth, async (req, res) => {
    const treatments = await storage.getPatientTreatments(parseInt(req.params.id));
    res.json(treatments);
  });

  // Treatment recommendation routes
  app.post("/api/treatments/recommend", requireAuth, async (req, res) => {
    try {
      const recommendations = await generateTreatmentRecommendations(req.body);
      const treatment = await storage.createTreatment({
        patientId: req.body.patientId,
        recommendations,
        timestamp: new Date().toISOString()
      });
      res.json(treatment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // AI Chat route
  app.post("/api/chat", requireAuth, async (req, res) => {
    try {
      const response = await getAIChatResponse(req.body.message);
      res.json({ response });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
