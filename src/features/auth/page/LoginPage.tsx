import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Moon, Store, Sun } from "lucide-react";
import useLogin from "../hooks/useLogin";
import { useDarkMode } from "../../../context/DarkMode";
import logo from "../../../assets/img/logo.png";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { isPending, mutate } = useLogin();
  const { isDark, setIsDark } = useDarkMode();

  return (
    <div className="grid min-h-screen bg-canvas lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative hidden overflow-hidden bg-[#1d1d1d] p-12 text-[#cccccc] lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(78,166,116,0.28),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(78,166,116,0.18),_transparent_42%)]" />
        <div className="relative">
          <img
            src={logo}
            alt="Bizda"
            className="relative h-20 w-auto object-contain object-left invert hue-rotate-180 xl:h-24"
          />
        </div>
        <div className="relative max-w-lg">
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
            <Store />
          </div>
          <h1 className="text-5xl leading-[1.1] font-extrabold tracking-tight text-white">
            Do‘koningizni
            <br />
            bir joydan boshqaring
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-white/70">
            Mahsulotlar, buyurtmalar, mijozlar va analitika — barchasi yagona,
            tiniq interfeysda.
          </p>
        </div>
        <p className="relative text-sm text-white/50">Bizda · 2026</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-between">
            <img
              src={logo}
              alt="Bizda"
              className="h-14 w-auto object-contain object-left dark:invert dark:hue-rotate-180 lg:hidden"
            />
            <div className="theme-toggle ml-auto">
              <button
                type="button"
                className={!isDark ? "is-active" : ""}
                onClick={() => setIsDark(false)}
                aria-label="Light mode"
              >
                <Sun size={16} />
              </button>
              <button
                type="button"
                className={isDark ? "is-active" : ""}
                onClick={() => setIsDark(true)}
                aria-label="Dark mode"
              >
                <Moon size={16} />
              </button>
            </div>
          </div>

          <div className="card p-8">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-extrabold tracking-tight">
                Xush kelibsiz
              </h1>
              <p className="text-sm text-muted">
                Tizimga kirish uchun ma'lumotlaringizni kiriting
              </p>
            </div>

            <Form
              layout="vertical"
              onFinish={(values: LoginFormValues) => mutate(values)}
              autoComplete="off"
              requiredMark={false}
              initialValues={{
                email: "",
                password: "",
              }}
            >
               {/* initialValues={{
                email: "admin@example.com",
                password: "Admin123!",
              }} */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email kiriting!" },
                  { min: 3, message: "Email kamida 3 ta belgidan iborat bo‘lishi kerak!" },
                ]}
              >
                <Input
                  defaultValue="admin@example.com"
                  size="large"
                  placeholder="Email kiriting"
                  prefix={<UserOutlined className="mr-1 text-muted" />}
                />
              </Form.Item>

              <Form.Item
                label="Parol"
                name="password"
                rules={[
                  { required: true, message: "Parolni kiriting!" },
                  { min: 6, message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak!" },
                ]}
              >
                <Input.Password
                  defaultValue="Admin123!"
                  size="large"
                  placeholder="Parolni kiriting"
                  prefix={<LockOutlined className="mr-1 text-muted" />}
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isPending}
                  disabled={isPending}
                  size="large"
                  className="h-11! w-full! rounded-xl! font-semibold!"
                >
                  Kirish
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
