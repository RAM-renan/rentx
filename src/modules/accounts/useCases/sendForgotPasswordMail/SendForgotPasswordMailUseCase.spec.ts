import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPassWordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () =>{

    beforeEach(()=>{
        userRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            userRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    })

    it("should be able to send a forgot password mail to user", async () => {
        const SendMail = jest.spyOn(mailProvider, "sendMail");

        await userRepositoryInMemory.create({
            driver_license: "1445",
            email: "sadyd@sss.com",
            name: "Sergio",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("sadyd@sss.com");

        expect(SendMail).toHaveBeenCalled();
    });

    it("should not be able to send a forgot password mail if user does not exists", async () => {
       await expect(
        sendForgotPasswordMailUseCase.execute("sadyd@sss.com")
       ).rejects.toEqual(new AppError("User does not exists!"))
    });

    it("should be able to create an users token", async () =>{
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

        userRepositoryInMemory.create({
            driver_license: "1234",
            email: "maamitaklsew@svs.com",
            name: "Marcelo",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("maamitaklsew@svs.com");

        expect(generateTokenMail).toBeCalled()
    })
})