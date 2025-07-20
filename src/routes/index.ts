import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

function loadRoutes(dir: string) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      loadRoutes(fullPath);
    }

    if (
      stat.isFile() &&
      (file.endsWith(".routes.ts") || file.endsWith(".routes.js"))
    ) {
      const route = require(fullPath);
      const routeModule = route.default || route;

      const relativePath = path
        .relative(__dirname, fullPath)
        .replace(/\\/g, "/")
        .replace(".routes.ts", "")
        .replace(".routes.js", "");

      const routeBase =
        "/" + relativePath.replace(/index$/, "").replace(/\/$/, "");

      console.log("Registrando rota:", routeBase);
      router.use(routeBase, routeModule);
    }
  });
}

loadRoutes(__dirname);

export default router;
