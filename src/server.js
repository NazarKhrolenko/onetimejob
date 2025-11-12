import { createServer, Model, Response } from "miragejs";
import sampleJobs from "./pages/Process/data/SampleJobs";
export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      jobs: Model,
      users: Model,
    },

    seeds(server) {
      sampleJobs.forEach((job) => server.create("job", job));
      server.create("user", {
        id: "1",
        name: "John Doe",
        email: "test@example.com",
        password: "password123",
      });
    },

    routes() {
      this.namespace = "api";
      this.logging = false;

      // GET all jobs
      this.get("/jobs", (schema) => {
        return schema.jobs.all().models.map((job) => job.attrs); // повертаємо масив job.attrs
      });

      // GET job by id
      this.get("/jobs/:id", (schema, request) => {
        const job = schema.jobs.find(request.params.id);
        if (!job) {
          return new Response(404, {}, { message: "Job not found" });
        }
        return job.attrs;
      });

      // POST login
      this.post("/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ email, password });
        if (!user) {
          return new Response(401, {}, { message: "Invalid credentials" });
        }
        return {
          user: { id: user.id, email: user.email, name: user.name },
          token: "fake-token-123",
        };
      });
    },
  });

  return server;
}
