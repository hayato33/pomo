import Section from "../Section";
import { ImageUploadSectionProps } from "../../_types/SectionProps";
import { FormFieldFileUpload, FormFieldInput } from "../FormField";

export default function ProfileSection({
  control,
  isSubmitting,
  setValue,
  getValues,
}: ImageUploadSectionProps) {
  return (
    <Section title="プロフィール設定">
      <FormFieldInput
        control={control}
        isSubmitting={isSubmitting}
        name="nickname"
        label="ニックネームを変更する"
      />
      <FormFieldFileUpload
        control={control}
        isSubmitting={isSubmitting}
        name="profileImageKey"
        label="プロフィール画像を変更する"
        altText="プロフィール画像"
        bucketName="profile-image"
        setValue={setValue}
        getValues={getValues}
      />
    </Section>
  );
}
