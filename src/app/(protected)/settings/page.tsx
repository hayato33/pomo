"use client";

import { PageTitle } from "../../_components/elements/PageTitle";
import {
  ProfileSection,
  TimerSection,
  SoundSection,
  TimelineSection,
  // RankingSection,
  PreferenceSection,
} from "./_components/sections";
import { FormActions } from "./_components/FormActions";
import { useUser } from "../../_hooks/useUser";
import { useSetting } from "../../_hooks/useSetting";
import { useForm } from "react-hook-form";
import { UpdateData } from "./_types/updateData";
import { useEffect } from "react";
import { settingFormSchema } from "./_lib/settingFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitHandler } from "./_hooks/useSubmitHandler";
import { Form } from "../../_components/Form";
import { DEFAULT_USER_SETTINGS } from "../../_config/userSettingConfig";
import { SettingLoading } from "./_components/settingLoading";

export default function Page() {
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    mutate: userMutate,
  } = useUser();
  const user = userData?.data;
  const {
    data: settingsData,
    isLoading: settingsLoading,
    isError: settingsError,
    mutate: settingsMutate,
  } = useSetting();
  const settings = settingsData?.data;
  const isLoading = userLoading || settingsLoading;
  const isError = userError || settingsError;
  const isLoaded = !isLoading && user && settings;
  const { submitHandler } = useSubmitHandler();

  const form = useForm<UpdateData>({
    resolver: zodResolver(settingFormSchema),
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
    setValue,
    getValues,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (user && settings) reset({ ...user, ...settings });
  }, [user, settings, reset]);

  const onSubmit = async (formData: UpdateData) => {
    await submitHandler(formData);
    userMutate();
    settingsMutate();
  };

  if (isError) return <div>エラーが発生しました</div>;

  return (
    <div className="mx-auto max-w-[400px]">
      <PageTitle>各種設定</PageTitle>
      <Form {...form}>
        {isLoading && <SettingLoading />}
        {isLoaded && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ProfileSection
              control={control}
              isSubmitting={isSubmitting}
              setValue={setValue}
              getValues={getValues}
            />
            <TimerSection control={control} isSubmitting={isSubmitting} />
            <SoundSection control={control} isSubmitting={isSubmitting} />
            <TimelineSection control={control} isSubmitting={isSubmitting} />
            {/* <RankingSection control={control} isSubmitting={isSubmitting} /> */}
            <PreferenceSection
              control={control}
              isSubmitting={isSubmitting}
              setValue={setValue}
              getValues={getValues}
            />
            <FormActions isSubmitting={isSubmitting} reset={reset} />
          </form>
        )}
      </Form>
    </div>
  );
}
