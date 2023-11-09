import {
  App as AntApp,
  ConfigProvider,
  FloatButton,
  theme as antdTheme,
} from "antd";
import zh_CN from "antd/locale/zh_CN";
import { useDark, usePageData } from "rspress/runtime";
import Theme from "rspress/theme";

export * from "rspress/theme";

const Layout = () => {
  const dark = useDark();
  const pageData = usePageData();

  return (
    <ConfigProvider
      locale={zh_CN}
      theme={{
        algorithm: dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <AntApp
        style={{
          fontSize: 16,
        }}
      >
        <Theme.Layout />
      </AntApp>
    </ConfigProvider>
  );
};

const theme: typeof Theme = {
  ...Theme,
  Layout,
};

export default theme;
