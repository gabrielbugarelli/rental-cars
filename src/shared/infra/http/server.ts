import { applicationBootstrap } from "./applicationBootstrap";

applicationBootstrap.listen(3333, () => {
  console.log('Aplication started on port: 3333 🚀')
});