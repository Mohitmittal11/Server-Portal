export interface ServerDetails {
  type: string;
  serverName: string;
  serverPort: number;
  npmPort: string;
  serverString: string;
}
// export interface AddUpdateServer {
//   project_name: string;
//   server: ServerDetails[];
// }

export interface serverList {
  _id: string;
  project_name: string;
  type: string;
  serverName: string;
  serverPort: number;
  npmPort: number;
  serverString: string;
  isActive: boolean;
  isDelete: boolean;
}

// const obj = {
//   project_name: "Ambiview",
//   type: "development",
//   serverName: "Development",
//   serverPort: 3000,
//   npmPort: "8001",
//   serverString: "https://",
// };
