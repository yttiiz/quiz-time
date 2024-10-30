"use server";

import { signIn, signOut } from "@/auth";
import { NodeMailer } from "@/services/mod";
import { Fetcher } from "@yttiiz/utils";
import { AuthError } from "next-auth";

export const handleCredentialsSignIn = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
    
  } catch (error) {
    if (error instanceof AuthError) {
      
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials",
          }
        };

        default: {
          return {
            message: "Something went wrong",
          }
        }
      }
    }
    
    throw error;
  }
};

export const handleSignOut = async () => {
  await signOut({ redirectTo: "/" });
}

export const handleSignUp = async (formData: FormData) => {
	const { APP_URL: host } = process.env;
	const data: Record<string, string | string> = {};
	const entries = formData.entries();

  // 1. Hydrate user data in data object.
	for (const [key, value] of entries) {
    data[key] = value as string;
	}
  
	try {
    // 2. Send data to database.
		const response = await Fetcher.postData<{ message: string }>(
      host + "/api/mongodb/user",
			data,
			"next",
		);
    
    // 3. Handle response.
		if (response.ok) {
      switch (response.data["message"]) {
        case "User created": {
          const { firstname, email, password } = data;
          
          // 4. if response "ok", get email textContent.
          const res = await Fetcher.postData<{
            title: string;
            contentText: string;
            contentHtml: string;
            greetings: string;
            team: string;
          }>(
            host + "/api/json",
            { file: "signup-email-content" },
            "next",
          );

          if (res.ok) {
            // 5. Create message to user.
            const { title, contentText, contentHtml, greetings, team } = res.data;
            let messagePlainText = "";
            let messageHtml = "";

            messagePlainText = contentText.replace("{{ userFirstname }}", firstname);
            messagePlainText += `${greetings}`;
            messagePlainText += `${team}`;

            messageHtml = contentHtml.replace("{{ userFirstname }}", `${firstname}`);
            messageHtml += `${greetings}`;
            messageHtml += `${team}`;

            const emailContent = {
              subject: title,
              messagePlainText,
              messageHtml,
            };
  
            NodeMailer.send({ to: email, emailContent, needToWriteLog: false });
  
            await signIn("credentials", {
              email,
              password,
              redirectTo: "/",
            });
          }

					break;
				}

				default: {
					return { message: response.data["message"] };
				}
			}
		}
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin": {
					return {
						message: "Invalid credentials",
					};
				}

				default: {
					return {
						message: "Something went wrong",
					};
				}
			}
		}

		throw error;
	}
};
