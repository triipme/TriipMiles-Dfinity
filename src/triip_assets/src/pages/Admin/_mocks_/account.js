// ----------------------------------------------------------------------

import { Images } from "../../../theme";

const account = info => ({
  displayName: `${info?.first_name ?? ""} ${info?.last_name ?? ""}`,
  email: info?.email,
  photoURL: Images.admin.mock.avatar.default
});

export default account;
