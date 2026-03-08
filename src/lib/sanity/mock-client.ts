// Mock client for build purposes
export const mockClient = {
  fetch: async (query: string, params?: Record<string, unknown>) => {
    // Use params if needed, or ignore them
    if (params && Object.keys(params).length > 0) {
      // Just consume the params to avoid the unused variable warning
    }
    // Return empty arrays/objects based on query
    if (query.includes('*[_type == "project"]')) {
      return [];
    } else if (query.includes('*[_type == "profile"]')) {
      return null;
    }
    return [];
  }
};