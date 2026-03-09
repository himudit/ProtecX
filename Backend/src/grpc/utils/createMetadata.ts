import grpc from "@grpc/grpc-js";

export function createMetadata({
    authorization,
    projectId,
    providerId,
}: {
    authorization?: string;
    projectId?: string;
    providerId?: string;
}) {

    const metadata = new grpc.Metadata();

    if (authorization) metadata.add("authorization", authorization);
    if (projectId) metadata.add("x-project-id", projectId);
    if (providerId) metadata.add("x-provider-id", providerId);

    return metadata;
}