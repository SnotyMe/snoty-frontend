import type { CredentialCreateDto } from "$lib/model/credential";
import { CredentialScope } from "$lib/model/credential";

export type CredentialCreateFormData = Omit<CredentialCreateDto, "role"> & { scope: CredentialScope; role: string | null };
