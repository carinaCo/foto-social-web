import * as React from 'react';
import {
    AppBar, CssBaseline
} from "@mui/material";
import GlobalAppToolBar from "./GlobalAppToolBar.tsx";
import GlobalPosts from "./GlobalPosts.tsx";

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError(error: any) {
      return { hasError: true };
    }
    componentDidCatch(error: any, errorInfo: any) {
      console.error("捕获错误:", error, errorInfo);
    }
    render() {
      if (this.state.hasError) {
        return <h2>Error! please retry </h2>;
      }
      return this.props.children;
    }
  }
  

const GlobalPromptPage: React.FC = () => {
    return (
        <>
            <CssBaseline enableColorScheme />
            <AppBar>
            <ErrorBoundary>
                <GlobalAppToolBar/>
            </ErrorBoundary>
            </AppBar>
          <GlobalPosts />
        </>
    )
}

export default GlobalPromptPage;
