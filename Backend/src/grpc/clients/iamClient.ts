import grpc from "@grpc/grpc-js";
import path from "path";
import { loadProto } from "../loader/protoLoader";
import { env } from "../../config/env";

const protoPath = path.join(__dirname,
    "../../proto/proto/iam/v1/iam.proto");


const proto: any = loadProto(protoPath);

const iamPackage = proto.auth.v1;

export const iamClient = new iamPackage.AuthService(
    env.AUTH_MICROSERVICE,
    grpc.credentials.createInsecure()
)