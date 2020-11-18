import {
  ALPHA_ONLY_STRING,
  DETICTION_LIMIT_TRIGGER,
  EXCEL_CELL_ADDRESS,
  EMAIL_ADDRESS
} from '@cjo3/shared/raw/constants/regex'
import * as Yup from 'yup'
import { schemaErrors, transformFunctionValues } from '../../constants'
import { TransformSettings } from '../../store/editor/interfaces'

export const TransformSettingsSchema: Yup.ObjectSchema<TransformSettings> = Yup.object().shape(
  {
    rangeStart: Yup.string().matches(
      EXCEL_CELL_ADDRESS,
      schemaErrors.excelCellAddress
    ),
    rangeEnd: Yup.string().matches(
      EXCEL_CELL_ADDRESS,
      schemaErrors.excelCellAddress
    ),
    ulTrigger: Yup.string()
      .matches(DETICTION_LIMIT_TRIGGER, schemaErrors.detectionLimitTrigger)
      .required(schemaErrors.required),
    ulTransform: Yup.mixed()
      .oneOf(Object.values(transformFunctionValues))
      .required(schemaErrors.required),
    ulTriggerZero: Yup.string().matches(
      ALPHA_ONLY_STRING,
      schemaErrors.alphaOnlyString
    ),
    olTrigger: Yup.string()
      .matches(DETICTION_LIMIT_TRIGGER, schemaErrors.detectionLimitTrigger)
      .required(schemaErrors.required),
    olTransform: Yup.mixed()
      .oneOf(Object.values(transformFunctionValues))
      .required(schemaErrors.required)
  }
)

export const PaymentFormSchema: Yup.ObjectSchema = Yup.object().shape({
  billingEmail: Yup.string().matches(
    EMAIL_ADDRESS,
    schemaErrors.invalidEmailAddress
  )
})
