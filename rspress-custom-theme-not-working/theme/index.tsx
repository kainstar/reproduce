import Theme from "rspress/theme";

const CustomLayout = () => (
  <Theme.Layout beforeNavTitle={<span>😄</span>} bottom={<div>bottom</div>} />
);

const theme = {
  ...Theme,
  Layout: CustomLayout,
};

export default theme;

export * from "rspress/theme";
