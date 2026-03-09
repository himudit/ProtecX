import * as grpc from "@grpc/grpc-js";

export function getClientIp(req: any) {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        const ip = Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor.split(',')[0];
        return ip.trim();
    }
    return req.socket?.remoteAddress || req.ip || '127.0.0.1';
}

export function createMetadata({
    authorization,
    projectId,
    providerId,
    ip,
}: {
    authorization?: string;
    projectId?: string;
    providerId?: string;
    ip?: string;
}) {

    const metadata = new grpc.Metadata();

    if (authorization) metadata.add("authorization", authorization);
    if (projectId) metadata.add("x-project-id", projectId);
    if (providerId) metadata.add("x-provider-id", providerId);

    const clientIp = ip || "127.0.0.1";
    metadata.add("x-forwarded-for", clientIp);
    metadata.add("x-real-ip", clientIp);

    return metadata;
}
