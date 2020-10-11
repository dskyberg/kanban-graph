/**
 * setDefaults
 * Adam Nathaniel Davis @bytebodger
 * https://dev.to/bytebodger/default-props-in-react-ts-part-deux-2ic3
 *
 interface Props extends PropsWithChildren<any>{
   requiredString: string,
   requiredNumber: number,
   optionalBoolean?: boolean,
   optionalString?: string,
   optionalNumber?: number,
}

export const MyTSComponent: FC<Props> = (props: Props) => {
   const args = setDefaults(props, {
      optionalBoolean: true,
      optionalString: 'yo',
      optionalNumber: 42,
   });
   console.log(args);

 * @param defaults
 */
export default function setDefaults<Props, Defaults>(props: Props, defaults: Defaults): Required<Props> {
   const newProps: Required<Props> = { ...props } as Required<Props>;
   const defaultKeys = Object.keys(defaults) as string[];
   defaultKeys.forEach((key) => {
      const propKey = key as keyof Props;
      const defaultKey = key as keyof Defaults;
      Object.defineProperty(newProps, key, {
         value: props[propKey] !== undefined ? props[propKey] : defaults[defaultKey],
      });
   });
   return newProps;
}
