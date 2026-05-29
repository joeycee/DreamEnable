import {
  BlogPost,
  ContactPayload,
  ContactSubmissionResponse,
  PortfolioProject,
  Service,
  Testimonial,
} from "@/types/api";
import { API_ENDPOINTS, getApiBaseUrl } from "@/lib/api-config";

async function apiFetch<T>(
  endpoint: string,
  init?: RequestInit,
  options?: { revalidate?: number; tags?: string[] },
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${endpoint}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    next: options ? { revalidate: options.revalidate, tags: options.tags } : undefined,
  });

  if (!response.ok) {
    let detail = `API request failed: ${response.status} ${response.statusText}`;

    try {
      const data = (await response.json()) as Record<string, unknown>;
      const firstEntry = Object.entries(data)[0];
      if (firstEntry) {
        const [, value] = firstEntry;
        detail = Array.isArray(value) ? String(value[0]) : String(value);
      }
    } catch {
      // Fall back to the HTTP status message when the response body is not JSON.
    }

    throw new Error(detail);
  }

  return response.json() as Promise<T>;
}

export async function getServices() {
  return apiFetch<Service[]>(API_ENDPOINTS.services, undefined, {
    revalidate: 300,
    tags: ["services"],
  });
}

export async function getTestimonials() {
  return apiFetch<Testimonial[]>(API_ENDPOINTS.testimonials, undefined, {
    revalidate: 300,
    tags: ["testimonials"],
  });
}

export async function getBlogPosts() {
  return apiFetch<BlogPost[]>(API_ENDPOINTS.blog, undefined, {
    revalidate: 300,
    tags: ["blog"],
  });
}

export async function getBlogPost(slug: string) {
  return apiFetch<BlogPost>(`${API_ENDPOINTS.blog}${slug}/`, undefined, {
    revalidate: 300,
    tags: [`blog-${slug}`],
  });
}

export async function getPortfolioProjects() {
  return apiFetch<PortfolioProject[]>(API_ENDPOINTS.portfolio, undefined, {
    revalidate: 300,
    tags: ["portfolio"],
  });
}

export async function getPortfolioProjectById(idOrSlug: string | number) {
  const projects = await getPortfolioProjects();
  const lookup = String(idOrSlug);
  return (
    projects.find(
      (project) => String(project.id) === lookup || project.slug === lookup,
    ) ?? null
  );
}

export async function submitContactForm(payload: ContactPayload) {
  return apiFetch<ContactSubmissionResponse>(API_ENDPOINTS.contact, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
