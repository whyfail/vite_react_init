import type { ReactElement } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notify } from '@/app/notifications';
import { setToken } from '@/features/auth/session';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Field, FieldError } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import LoginPrism from './LoginPrism';

interface LoginFormValues {
  name: string
  password: string
  checked?: boolean
}

function LoginIndex(): ReactElement {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<LoginFormValues>({
    name: 'admin',
    password: 'admin',
    checked: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});

  const onFinish = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const nextErrors: Partial<Record<keyof LoginFormValues, string>> = {};

    if (!formValues.name.trim()) {
      nextErrors.name = '账号必填';
    }

    if (!formValues.password.trim()) {
      nextErrors.password = '密码必填';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    try {
      if (formValues.name === 'admin' && formValues.password === 'admin') {
        setToken('123', formValues.checked);
        notify.success('登录成功');
        navigate('/');
      } else {
        notify.error('登录失败');
      }
    } catch (e: unknown) {
      console.error(e instanceof Error ? e.message : e);
      notify.error('登录失败');
    }
  };

  const updateFormValue = <K extends keyof LoginFormValues>(key: K, value: LoginFormValues[K]): void => {
    setFormValues(prev => ({ ...prev, [key]: value }));

    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  return (
    <div className="relative h-full w-full">
      <LoginPrism
        animationType="rotate"
        timeScale={0.5}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={1}
        noise={0.5}
        glow={1}
      />
      <div className="absolute left-[calc(50%-260px)] top-[calc(50%-180px)] w-[520px] rounded-[32px] bg-[#ecf0f350] p-8 shadow-[1px_1px_3px_#cbced1,-1px_-1px_3px_white]">
        <h2 className="text-center text-[32px] text-[#ffffff] font-bold text-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">登录</h2>
        <form className="mt-6 flex flex-col gap-4" onSubmit={onFinish}>
          <Field data-invalid={Boolean(errors.name)}>
            <Input
              aria-invalid={Boolean(errors.name)}
              placeholder="请输入账号：admin"
              value={formValues.name}
              onChange={e => updateFormValue('name', e.target.value)}
              className="h-10 bg-white/80"
            />
            <FieldError>{errors.name}</FieldError>
          </Field>
          <Field data-invalid={Boolean(errors.password)}>
            <Input
              aria-invalid={Boolean(errors.password)}
              type="password"
              placeholder="请输入登录密码：admin"
              value={formValues.password}
              onChange={e => updateFormValue('password', e.target.value)}
              className="h-10 bg-white/80"
            />
            <FieldError>{errors.password}</FieldError>
          </Field>
          <Button className="h-10 w-full" type="submit">
            登录
          </Button>
          <label className="flex items-center justify-end gap-2 text-sm text-white">
            <Checkbox
              checked={formValues.checked}
              onCheckedChange={checked => updateFormValue('checked', checked === true)}
            />
            记住账号
          </label>
        </form>
      </div>
    </div>
  );
}

export default LoginIndex;
