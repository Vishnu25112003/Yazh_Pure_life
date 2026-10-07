export type ServiceRequestPayload = {
  name: string;
  phone: string;
  customerId: string;
  address: string;
  complaint: string;
};

export async function submitServiceRequest(payload: ServiceRequestPayload): Promise<void> {
  const res = await fetch("/api/service-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to submit service request (${res.status})`);
  }
}
