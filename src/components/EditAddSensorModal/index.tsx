import { definitions } from "@common/types/supabase";
import { Button, Submit } from "@components/Button";
import * as yup from "yup";
import { FormTextInput } from "@components/FormTextInput";
import { SmallModalOverlay } from "@components/SmallModalOverlay";
import { Controller, useForm } from "react-hook-form";
import {
  requiredSensorNameValidation,
  requiredSymbolIdValidation,
  requiredLatitude,
  requiredLongitude,
  requiredSensorCategoryValidation,
  requiredSensorIntegrationValidation,
  requiredSensorDescriptionValidation,
  requiredTTNDeviceIDValidation,
} from "@lib/formValidationUtil";
import React, { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormTextarea } from "@components/FormTextarea";
import { FormListBox } from "@components/FormListBox";
import { useSensorCategories } from "@lib/hooks/useSensorCategories";
import { PreviewMap } from "@components/PreviewMap";
import { CategoryIcon } from "@components/CategoryIcon";
import { SensorSymbol } from "@components/SensorSymbol";
import { InteractiveMapProps } from "react-map-gl/src/components/interactive-map";

interface CommonDataType {
  name: string;
  symbolId: number;
  description: string;
  categoryId: definitions["categories"]["id"];
  latitude: number;
  longitude: number;
}

interface HTTPDataType extends CommonDataType {
  integration: "http";
  ttnDeviceId: undefined;
}

interface TTNDataType extends CommonDataType {
  integration: "ttn";
  ttnDeviceId: string;
}

type SumbitDataType = HTTPDataType | TTNDataType;

export interface EditAddSensorModalPropType {
  title: string;
  defaultValues?: Partial<SumbitDataType>;
  onSubmit?: (sensorData: SumbitDataType) => void;
  submitButtonText?: string;
  onCancel?: () => void;
  cancelButtonText?: string;
  onDelete?: () => void;
  deleteButtonText?: string;
}

const formSchema = yup.object().shape({
  name: requiredSensorNameValidation,
  symbolId: requiredSymbolIdValidation,
  latitude: requiredLatitude,
  longitude: requiredLongitude,
  categoryId: requiredSensorCategoryValidation,
  description: requiredSensorDescriptionValidation,
  integration: requiredSensorIntegrationValidation,
  ttnDeviceId: requiredTTNDeviceIDValidation,
});

const DEFAULT_LAT = 52.5;
const DEFAULT_LNG = 13.39;

export const EditAddSensorModal: FC<EditAddSensorModalPropType> = ({
  title,
  defaultValues = {},
  onSubmit = () => undefined,
  onCancel = () => undefined,
  onDelete = () => undefined,
  submitButtonText = "Speichern",
  cancelButtonText = "Abbrechen",
  deleteButtonText = "Löschen",
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SumbitDataType>({
    resolver: yupResolver(formSchema),
  });
  const [integration, setIntegration] = useState(
    defaultValues.integration || "http"
  );
  const [viewport, setViewport] = useState<Partial<InteractiveMapProps>>({
    latitude: defaultValues?.latitude || DEFAULT_LAT,
    longitude: defaultValues?.longitude || DEFAULT_LNG,
    zoom: 12,
  });
  const {
    categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useSensorCategories();

  const formatError = (errorMsg?: string): string[] =>
    errorMsg ? [errorMsg] : [];

  return (
    <SmallModalOverlay className='w-[640px] max-w-full' title={title}>
      <form
        noValidate
        onSubmit={handleSubmit(data =>
          onSubmit({
            ...data,
            categoryId: parseInt(`${data.categoryId}`, 10),
          })
        )}
        className='flex flex-col gap-2 sm:gap-4'
      >
        <fieldset className='xs:grid xs:grid-cols-12 gap-4'>
          <Controller
            name='name'
            control={control}
            defaultValue={defaultValues?.name}
            render={({ field }) => (
              <FormTextInput
                {...field}
                label='Name'
                placeholder='Wie soll dein Sensor heißen?'
                type='text'
                errors={formatError(errors.name?.message)}
                containerClassName='xs:col-span-9'
              />
            )}
          />
          <Controller
            name='symbolId'
            control={control}
            defaultValue={defaultValues?.symbolId}
            render={({ field }) => (
              <FormListBox
                {...field}
                label='Symbol'
                containsIconList
                options={Array.from(Array(32)).map((_, i) => ({
                  name: (
                    <span className='w-6 h-6 float-left inline-block'>
                      <SensorSymbol symbol={i + 1} />
                    </span>
                  ),
                  value: i + 1,
                }))}
                errors={formatError(errors.symbolId?.message)}
                className='xs:col-span-3'
              />
            )}
          />
        </fieldset>
        <Controller
          name='description'
          control={control}
          defaultValue={defaultValues?.description}
          render={({ field }) => (
            <FormTextarea
              {...field}
              label='Beschreibung'
              placeholder='Beschreibe kurz der Sensor'
              errors={formatError(errors.description?.message)}
            />
          )}
        />
        <fieldset className='xs:grid grid-cols-6 sm:grid-cols-2 gap-4'>
          <Controller
            name='categoryId'
            control={control}
            defaultValue={defaultValues?.categoryId}
            render={({ field }) => (
              <FormListBox
                {...field}
                label='Kategorie'
                placeholder='Wähle eine Kategorie'
                options={
                  (categories &&
                    !isLoadingCategories &&
                    !categoriesError &&
                    categories.map(category => ({
                      value: category.id,
                      name: (
                        <span className='flex items-center gap-2'>
                          <CategoryIcon categoryId={category.id} />
                          {category.name}
                        </span>
                      ),
                    }))) ||
                  []
                }
                errors={formatError(errors.categoryId?.message)}
                className='xs:col-span-4 sm:col-span-1'
              />
            )}
          />
          <div className='flex flex-col gap-2 xs:col-span-2 sm:col-span-1'>
            <Controller
              name='integration'
              control={control}
              defaultValue={integration}
              render={({ field }) => (
                <FormListBox
                  {...field}
                  onChange={evt => {
                    field.onChange(evt);
                    setIntegration(field.value === "ttn" ? "http" : "ttn");
                  }}
                  label='Integration'
                  placeholder='Wie möchtest du dein Sensor integrieren?'
                  options={[
                    { name: "HTTP", value: "http" },
                    { name: "TTN", value: "ttn" },
                  ]}
                  errors={formatError(errors.integration?.message)}
                />
              )}
            />
            {integration === "ttn" && (
              <Controller
                name='ttnDeviceId'
                control={control}
                render={({ field }) => (
                  <FormTextInput
                    {...field}
                    label='TTN Device ID'
                    placeholder='lorawan-heltec-24b'
                    type='text'
                    errors={formatError(errors.ttnDeviceId?.message)}
                  />
                )}
              />
            )}
          </div>
        </fieldset>
        <div>
          <fieldset className='grid grid-cols-2'>
            <Controller
              name='latitude'
              control={control}
              defaultValue={viewport.latitude}
              render={({ field }) => (
                <FormTextInput
                  {...field}
                  onChange={evt => {
                    field.onChange(evt);
                    setViewport({
                      ...viewport,
                      latitude: Number.parseFloat(
                        `${field.value}`.slice(0, 10)
                      ),
                    });
                  }}
                  label='Latitude'
                  placeholder={`${DEFAULT_LAT}`}
                  type='number'
                  errors={formatError(errors.latitude?.message)}
                  className='relative z-0 focus:z-10'
                  min={-90}
                  max={90}
                  step={1 / 200}
                />
              )}
            />
            <Controller
              name='longitude'
              control={control}
              defaultValue={viewport.longitude}
              render={({ field }) => (
                <FormTextInput
                  {...field}
                  onChange={evt => {
                    field.onChange(evt);
                    setViewport({
                      ...viewport,
                      longitude: Number.parseFloat(
                        `${field.value}`.slice(0, 10)
                      ),
                    });
                  }}
                  label='Longitude'
                  placeholder={`${DEFAULT_LNG}`}
                  type='number'
                  errors={formatError(errors.longitude?.message)}
                  className='ml-[-1px] relative z-0 focus:z-10'
                  min={-180}
                  max={180}
                  step={1 / 400}
                />
              )}
            />
          </fieldset>
          <fieldset
            disabled
            role='region'
            className='mt-[-25px] relative border border-gray-200 w-[calc(100%-1px)]'
          >
            <PreviewMap
              interactive
              viewport={viewport}
              mapWidth='100%'
              mapHeight='200px'
              withMapLabels
              className='pointer-events-none'
              onViewportChange={viewport => {
                setViewport(viewport);
                setValue("latitude", viewport.latitude);
                setValue("longitude", viewport.longitude);
              }}
            />
            <span className='w-3 h-3 rounded-full bg-blue absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2' />
          </fieldset>
        </div>
        <div className='flex w-full sm:justify-between flex-wrap gap-4 items-end'>
          <div className='border-b sm:border-none w-full sm:w-auto pb-4 sm:pb-0'>
            <Button
              variant='dangerous'
              onClick={onDelete}
              className='w-full sm:w-auto'
            >
              {deleteButtonText}
            </Button>
          </div>
          <div className='w-full sm:w-auto flex gap-4'>
            <Button variant='secondary' onClick={onCancel}>
              {cancelButtonText}
            </Button>
            <Submit variant='primary'>{submitButtonText}</Submit>
          </div>
        </div>
      </form>
    </SmallModalOverlay>
  );
};
