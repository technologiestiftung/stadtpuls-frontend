import { definitions } from "@common/types/supabase";

export const tokens: definitions["auth_tokens"][] = [
  {
    id: "fgfgjsfdfsfgrasdkljasdladsasd",
    description: "My first token",
    nice_id: 1,
    scope: "sudo",
    user_id: "user-123",
  },
  {
    id: "usdfufbenrbfsdmbnhdfdsfdsfs",
    description: "TOOOKEN",
    nice_id: 2,
    scope: "sudo",
    user_id: "user-456",
  },
  {
    id: "uzewrvbdbansgdjsajdadad",
    description: "My token",
    nice_id: 3,
    scope: "sudo",
    user_id: "user-789",
  },
  {
    id: "oivofjbrbbfhbvfvfvfvfv",
    description: "Misc token for random stuff",
    nice_id: 4,
    scope: "sudo",
    user_id: "user-123",
  },
  {
    id: "hurhkgrbejbjmdhvjdkhv",
    description: "Token for CO2 sensors",
    nice_id: 5,
    scope: "sudo",
    user_id: "user-123",
  },
];
