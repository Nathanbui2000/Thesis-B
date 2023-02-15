
import {Description} from "./Description"
import {Verification} from "./Verification"
import {NormalUSer} from "../Java/NormalUser"
import { Appraiser } from "./Appraiser"
import {Documentation} from "./Documentation"
export interface AntiqueObject {
    antiqueID: number,
    name: string,
    owner: NormalUSer,
    professionalVerifier: Appraiser,
    documentation: Documentation,
    description: Description,
    verification: Verification,
  }