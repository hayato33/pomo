"use client";

import PageTitle from "../_components/elements/PageTItle";
import ProfileSection from "./_components/sections/ProfileSection";
import TimerSection from "./_components/sections/TimerSection";
import SoundSection from "./_components/sections/SoundSection";
import TimelineSection from "./_components/sections/TimelineSection";
import RankingSection from "./_components/sections/RankingSection";
import PreferenceSection from "./_components/sections/PreferenceSection";
import FormActions from "./_components/FormActions";
import { useUser } from "../_hooks/useUser";
import { useSetting } from "../_hooks/useSetting";
import { useForm } from "react-hook-form";
import { UpdateData } from "./_types/updateData";
import { useEffect } from "react";
import { settingSchema } from "./_lib/settingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { submitHandler } from "./_lib/submitHandler";
import { Form } from "../_components/Form";
import { DEFAULT_USER_SETTINGS } from "../_config/userSettingConfig";

export default function Page() {
  const { token } = useSupabaseSession();
  const { data: userData } = useUser();
  const user = userData?.data;
  const { data: settingsData } = useSetting();
  const settings = settingsData?.data;

  const form = useForm<UpdateData>({
    resolver: zodResolver(settingSchema),
    mode: "onTouched",
    defaultValues: {
      nickname: "",
      profileImageKey: null,
      ...DEFAULT_USER_SETTINGS,
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (user || settings)
      form.reset({
        ...user,
        ...settings,
      });
  }, [user, settings, form]);

  const onSubmit = async (formData: UpdateData) =>
    await submitHandler(formData, token || "");

  return (
    <div className="mx-auto max-w-[400px]">
      <PageTitle>各種設定</PageTitle>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfileSection control={control} isSubmitting={isSubmitting} />
          <TimerSection control={control} isSubmitting={isSubmitting} />
          <SoundSection control={control} isSubmitting={isSubmitting} />
          <TimelineSection control={control} isSubmitting={isSubmitting} />
          <RankingSection control={control} isSubmitting={isSubmitting} />
          <PreferenceSection control={control} isSubmitting={isSubmitting} />
          <FormActions isSubmitting={form.formState.isSubmitting} />
        </form>
      </Form>
    </div>
  );
}
