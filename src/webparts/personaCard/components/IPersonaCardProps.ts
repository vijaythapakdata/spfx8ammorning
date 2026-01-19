import {MSGraphClientV3} from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IPersonaCardProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  graphClient:MSGraphClientV3;
  context:WebPartContext;
}
