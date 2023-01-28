import {Documentation} from "./Documentation"
import {Description} from "./Description"
import {Verification} from "./Verification"
import {NormalUSer} from "./NormalUser"
import { Appraiser } from "./Appraiser"
export interface AntiqueObject {
    antiqueID: number,
    name: string,
    owner: NormalUSer,
    professionalVerifier: Appraiser,
    documentation: Documentation,
    description: Description,
    verification: Verification,
  }