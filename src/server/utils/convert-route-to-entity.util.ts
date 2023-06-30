const mapping: Record<string, string> = {
  businesses: 'business',
  earnings: 'earning',
  expenditures: 'expenditure',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
