import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("doctor"),
});

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  medicalHistory: text("medical_history").notNull(),
  dnaProfile: text("dna_profile").notNull(),
  lifestyle: text("lifestyle").notNull(),
  geneExpressionData: jsonb("gene_expression_data"),
  mutationProfile: jsonb("mutation_profile")
});

export const treatments = pgTable("treatments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull(),
  recommendations: jsonb("recommendations").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  efficacyScore: integer("efficacy_score"),
  aiAnalysisDetails: jsonb("ai_analysis_details")
});

export const asoTargets = pgTable("aso_targets", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull(),
  targetSequence: text("target_sequence").notNull(),
  geneId: text("gene_id").notNull(),
  confidence: integer("confidence").notNull(),
  analysisDetails: jsonb("analysis_details").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow()
});

export const cancerVaccineTargets = pgTable("cancer_vaccine_targets", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull(),
  neoantigen: text("neoantigen").notNull(),
  mutationDetails: jsonb("mutation_details").notNull(),
  immunogenicityScore: integer("immunogenicity_score").notNull(),
  analysisDetails: jsonb("analysis_details").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow()
});

// Export schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});

export const insertPatientSchema = createInsertSchema(patients);
export const insertTreatmentSchema = createInsertSchema(treatments);
export const insertASOTargetSchema = createInsertSchema(asoTargets);
export const insertCancerVaccineTargetSchema = createInsertSchema(cancerVaccineTargets);

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertPatient = z.infer<typeof insertPatientSchema>;
export type InsertTreatment = z.infer<typeof insertTreatmentSchema>;
export type InsertASOTarget = z.infer<typeof insertASOTargetSchema>;
export type InsertCancerVaccineTarget = z.infer<typeof insertCancerVaccineTargetSchema>;

export type User = typeof users.$inferSelect;
export type Patient = typeof patients.$inferSelect;
export type Treatment = typeof treatments.$inferSelect;
export type ASOTarget = typeof asoTargets.$inferSelect;
export type CancerVaccineTarget = typeof cancerVaccineTargets.$inferSelect;