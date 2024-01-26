import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { sql } from "../config.db";
import { z } from "zod";

const vehicleRouter = new Hono();
const vehicleSchema = z.object({
  name: z.string().min(1),
  mission: z.string().min(1),
});
const parseVehicle = (vehicle: any) => vehicleSchema.parse(vehicle);

vehicleRouter.get("/", async (c) => {
  const vehiclesFromDb = await sql`
    SELECT * FROM vehicle
  `;

  const vehicles = vehiclesFromDb.map((v) => parseVehicle(v));

  return c.json({ vehicles });
});

vehicleRouter.post("/create", async (c) => {
  try {
    const { name, mission } = parseVehicle(await c.req.json());

    const result = await sql`
      INSERT INTO vehicle (name, mission)
      VALUES (${name}, ${mission})
      ON CONFLICT (name) DO NOTHING
    `;
    if (result[0].length > 0) {
      return c.json({ success: true, vehicle: { name, mission } });
    } else {
      return c.json({ success: false, error: "Vehicle already exists" });
    }
  } catch (error: any) {
    console.error("Error creating vehicle:", error.message);
    return c.status(500);
  }
});

export default vehicleRouter;
