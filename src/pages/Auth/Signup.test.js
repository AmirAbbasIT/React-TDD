import { render, screen, waitFor, act } from "@testing-library/react";
import SignupPage from "./Signup";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { setupServer } from "msw/node";
import { rest } from "msw";
import "../../locals/index.js";
import i18next from "i18next";

import en from "../../locals/en.json";
import ur from "../../locals/ur.json";
import Translation from "../../components/Translation";

describe("signup page tests", () => {
  let request = {};
  let acceptLangHeader;
  const server = setupServer(
    rest.post("/api/1.0/users", (req, res, ctx) => {
      acceptLangHeader = req.headers.get("Accept-Language");
      request = req.body;
      return res(ctx.status(200));
    })
  );

  beforeEach(() => {
    server.resetHandlers();
  });
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  afterEach(() => {
    act(() => {
      i18next.changeLanguage("en");
    });
  });

  describe("Layout Tests", () => {
    it("has signup", () => {
      render(<SignupPage />);
      let h = screen.queryByRole("heading", { name: "sign up" });
      expect(h).toBeInTheDocument();
    });

    it("has button disabled inittially", () => {
      render(<SignupPage />);

      let button = screen.queryByTestId("submit");
      expect(button).toBeDisabled();
    });
  });

  // describe("Interactions Tests", () => {
  //   ////////

  //   it("has macthed passwords", async () => {
  //     render(<SignupPage />);

  //     let password = screen.queryByTestId("password");
  //     let confirmPassword = screen.queryByTestId("confirmPassword");

  //     act(() => {
  //       userEvent.type(password, "a");
  //       userEvent.type(confirmPassword, "a");
  //     });

  //     let button = screen.queryByTestId("submit");

  //     await waitFor(() => {
  //       expect(button).toBeEnabled();
  //     });
  //   });

  //   //////////
  //   ///with mocking axios

  //   // it("has requested data", async () => {
  //   //   const { debug } = render(<SignupPage />);

  //   //   let userName = screen.queryByTestId("userName");
  //   //   let email = screen.queryByTestId("email");
  //   //   let password = screen.queryByTestId("password");
  //   //   let confirmPassword = screen.queryByTestId("confirmPassword");

  //   //   act(() => {
  //   //     userEvent.type(userName, "amirAbbasIT");
  //   //     userEvent.type(email, "amirAbbas@gmail.com");
  //   //     userEvent.type(password, "Abc123");
  //   //     userEvent.type(confirmPassword, "Abc123");
  //   //   });

  //   //   const mockFn = jest.fn();
  //   //   axios.post = mockFn;

  //   //   await waitFor(() => {
  //   //     let button = screen.queryByTestId("submit");
  //   //     userEvent.click(button);
  //   //   });

  //   //   const apiCalls = mockFn.mock.calls[0];
  //   //   const body = apiCalls[1];

  //   //   expect(body).toEqual({
  //   //     userName: "amirAbbasIT",
  //   //     email: "amirAbbas@gmail.com",
  //   //     password: "Abc123",
  //   //   });
  //   // });

  //   // it("has requested data", async () => {

  //   // //////////
  //   // ///with mocking Fetch

  //   //   const { debug } = render(<SignupPage />);

  //   //   let userName = screen.queryByTestId("userName");
  //   //   let email = screen.queryByTestId("email");
  //   //   let password = screen.queryByTestId("password");
  //   //   let confirmPassword = screen.queryByTestId("confirmPassword");

  //   //   act(() => {
  //   //     userEvent.type(userName, "amirAbbasIT");
  //   //     userEvent.type(email, "amirAbbas@gmail.com");
  //   //     userEvent.type(password, "Abc123");
  //   //     userEvent.type(confirmPassword, "Abc123");
  //   //   });

  //   //   const mockFn = jest.fn();
  //   //   window.fetch = mockFn;

  //   //   await waitFor(() => {
  //   //     let button = screen.queryByTestId("submit");
  //   //     userEvent.click(button);
  //   //   });

  //   //   const apiCalls = mockFn.mock.calls[0];
  //   //   const body = JSON.parse(apiCalls[1].body);

  //   //   expect(body).toEqual({
  //   //     userName: "amirAbbasIT",
  //   //     email: "amirAbbas@gmail.com",
  //   //     password: "Abc123",
  //   //   });
  //   // });

  //   ////
  //   // with msw
  //   it("has requested data", async () => {
  //     const { debug } = render(<SignupPage />);

  //     let userName = screen.queryByTestId("userName");
  //     let email = screen.queryByTestId("email");
  //     let password = screen.queryByTestId("password");
  //     let confirmPassword = screen.queryByTestId("confirmPassword");

  //     act(() => {
  //       userEvent.type(userName, "amirAbbasIT");
  //       userEvent.type(email, "amirAbbas@gmail.com");
  //       userEvent.type(password, "Abc123");
  //       userEvent.type(confirmPassword, "Abc123");
  //     });

  //     await waitFor(() => {
  //       let button = screen.queryByTestId("submit");
  //       userEvent.click(button);
  //     });

  //     await new Promise((resolver) => setTimeout(resolver, 500));

  //     expect(request).toEqual({
  //       username: "amirAbbasIT",
  //       email: "amirAbbas@gmail.com",
  //       password: "Abc123",
  //     });
  //   });

  //   //// Hide Form after submitting Request...
  //   it("Validate Email Screen after submitting form", async () => {
  //     const { debug } = render(<SignupPage />);

  //     let userName = screen.queryByTestId("userName");
  //     let email = screen.queryByTestId("email");
  //     let password = screen.queryByTestId("password");
  //     let confirmPassword = screen.queryByTestId("confirmPassword");

  //     act(() => {
  //       userEvent.type(userName, "amirAbbasIT");
  //       userEvent.type(email, "amirAbbas@gmail.com");
  //       userEvent.type(password, "Abc123");
  //       userEvent.type(confirmPassword, "Abc123");
  //     });

  //     await waitFor(() => {
  //       let button = screen.queryByTestId("submit");
  //       userEvent.click(button);
  //     });

  //     await new Promise((resolver) => setTimeout(resolver, 500));

  //     await waitFor(() => {
  //       let ValidateEmailMessage = screen.queryByTestId("message");
  //       expect(ValidateEmailMessage).toBeInTheDocument();
  //     });
  //   });

  //   it.each`
  //     field         | value
  //     ${"username"} | ${"Username cannot be null"}
  //     ${"email"}    | ${"E-mail is not valid"}
  //     ${"password"} | ${"Password must be at least 6 characters"}
  //   `("display validation error for $field ", async ({ field, value }) => {
  //     const { debug } = render(<SignupPage />);

  //     server.use(
  //       rest.post("/api/1.0/users", (req, res, ctx) => {
  //         return res(
  //           ctx.status(400),
  //           ctx.json({
  //             validationErrors: {
  //               [field]: value,
  //             },
  //           })
  //         );
  //       })
  //     );

  //     let userName = screen.queryByTestId("userName");
  //     let email = screen.queryByTestId("email");
  //     let password = screen.queryByTestId("password");
  //     let confirmPassword = screen.queryByTestId("confirmPassword");

  //     act(() => {
  //       userEvent.type(userName, "");
  //       userEvent.type(email, "a");
  //       userEvent.type(password, "a");
  //       userEvent.type(confirmPassword, "a");
  //     });

  //     await waitFor(() => {
  //       let button = screen.queryByTestId("submit");
  //       userEvent.click(button);
  //     });

  //     let text = await screen.findByText(value);
  //     expect(text).toBeInTheDocument();
  //   });
  // });

  // describe("Internationalization Test Cases", () => {
  //   it("Inially language is English", () => {
  //     render(<SignupPage />);
  //     let title = screen.queryByText(en.signupTitle);
  //     expect(title).toBeInTheDocument();
  //   });

  //   it("Change Language to urdu when clicked pakistan", () => {
  //     render(<Translation />);
  //     const { debug } = render(<SignupPage />);
  //     let urduButton = screen.getByTestId("urdu");
  //     act(() => {
  //       userEvent.click(urduButton);
  //     });
  //     let title = screen.queryAllByText(ur.signupTitle)[0];
  //     expect(title).toBeInTheDocument();
  //   });

  //   it("Accept Language header exist in api request", async () => {
  //     const { debug } = render(<SignupPage />);

  //     let userName = screen.queryByTestId("userName");
  //     let email = screen.queryByTestId("email");
  //     let password = screen.queryByTestId("password");
  //     let confirmPassword = screen.queryByTestId("confirmPassword");

  //     act(() => {
  //       userEvent.type(userName, "a");
  //       userEvent.type(email, "aa");
  //       userEvent.type(password, "Ab");
  //       userEvent.type(confirmPassword, "Ab");
  //     });

  //     await waitFor(() => {
  //       let button = screen.queryByTestId("submit");
  //       userEvent.click(button);
  //     });

  //     expect(acceptLangHeader).toBe(i18next.language);
  //   });
  // });
});
