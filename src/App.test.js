import { render, screen, waitFor } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Home from "./pages/Home/Home";
import App from "./App";
import { act } from "react-dom/test-utils";
import i18next from "i18next";

describe("Application Test Cases", () => {
  describe("Routing Test cases of navbar", () => {
    it.each`
      path         | pagedataId
      ${"/"}       | ${"homePage"}
      ${"/login"}  | ${"loginPage"}
      ${"/signup"} | ${"signupPage"}
      ${"/user"}   | ${"userPage"}
    `("$page pagedataId route exist", ({ path, pagedataId }) => {
      window.history.pushState({}, "", path);
      render(<App i18next={i18next} />);
      expect(screen.queryByTestId(pagedataId)).toBeInTheDocument();
    });

    it.each`
      path         | pagedataId
      ${"/"}       | ${"loginPage"}
      ${"/"}       | ${"signupPage"}
      ${"/"}       | ${"userPage"}
      ${"/login"}  | ${"homePage"}
      ${"/login"}  | ${"signupPage"}
      ${"/login"}  | ${"userPage"}
      ${"/signup"} | ${"homePage"}
      ${"/signup"} | ${"loginPage"}
      ${"/signup"} | ${"userPage"}
      ${"/user"}   | ${"homePage"}
      ${"/user"}   | ${"loginPage"}
      ${"/user"}   | ${"signupPage"}
    `("$page pagedataId should not exist", ({ path, pagedataId }) => {
      window.history.pushState({}, "", path);
      render(<App i18next={i18next} />);
      expect(screen.queryByTestId(pagedataId)).not.toBeInTheDocument();
    });

    /// Navbar Clicks Testing...
    it.each`
      path           | pagedataId
      ${"logo-link"} | ${"homePage"}
      ${"/login"}    | ${"loginPage"}
      ${"/signup"}   | ${"signupPage"}
      ${"/user"}     | ${"userPage"}
    `("$path $pagedataId should be visited.", ({ path, pagedataId }) => {
      render(<App i18next={i18next} />);
      const link = screen.getByTestId(path);
      act(() => {
        UserEvent.click(link);
      });

      waitFor(() => {
        expect(screen.queryByTestId(pagedataId)).toBeInTheDocument();
      });
    });
  });
});
