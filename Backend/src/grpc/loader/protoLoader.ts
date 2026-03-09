import grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

export function loadProto(path: string) {
    const packageDef = protoLoader.loadSync(path, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });

    return grpc.loadPackageDefinition(packageDef);
}