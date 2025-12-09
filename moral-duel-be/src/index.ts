import app from "./app";
import { mockDb } from "./utils/mockDb";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    mockDb.seed(); // Seed initial data

    // Register Agent on ATP
    const { atpService } = await import("./services/atp.service");
    await atpService.registerAgent("MoralOracleAgent");
});
