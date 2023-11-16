export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'CREATED': return 201;
    case 'REQUIRED_DATA': return 400;
    case 'INVALID_DATA': return 401;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 422;
    case 'INVALID_TOKEN': return 500;
    default: return 500;
  }
}
