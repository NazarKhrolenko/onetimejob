// --- JOBS ---
export async function getJobs(id) {
  const url = id ? `/api/jobs/${id}` : "/api/jobs";
  const res = await fetch(url);

  if (!res.ok) {
    throw {
      message: "Failed to fetch jobs",
      statusText: res.statusText,
      status: res.status,
    };
  }

  const data = await res.json();

  // Якщо виклик без id, очікуємо масив
  if (!id) return Array.isArray(data) ? data : [];
  // Якщо виклик із id, обертаємо в масив, щоб завжди було iterable
  return data ? [data] : [];
}

// --- LOGIN ---
export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  });

  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message || "Login failed",
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}

// --- CREATE JOB ---
export async function createJob(jobData) {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message || "Failed to create job",
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
