# Value type

A value type is a type/class/struct you can make in your code to ensure more typesecurity.\
It makes it so that you can distuinguish between different integers and strings in your code, add requirements to these and other distinct rules for that type.

## Private constructor
By having a private constructor you force the user to us eone of your `.From` methods to create an object.\
We do this because we do not want to throw an exception in the constructor if there are complicated rules fr the type etc..

## From
Takes a parameter of type x and returns an object of the given type by using the private constructor.

## Create
Use where you want to create a new value without taking any input parameters.\
Ex. when you want to create an Id type and the value is a randon Guid.

## IsValid, HasValue, TryParse

Other methods that can be helpful to create for the type


```C#

using System;
using UDIR.Prover.Models.Identitetsnummer;

namespace UDIR.Prover.Models.Primitives
{
	public struct GjennomforingssystemUserId
	{
		public string Value { get; }

		private GjennomforingssystemUserId(string value) : this()
		{
			Value = value;
		}

		public bool HasValue()
		{
			return !string.IsNullOrWhiteSpace(Value);
		}

		public static GjennomforingssystemUserId From(string i)
		{
			return new GjennomforingssystemUserId(i);
		}

		private static GjennomforingssystemUserId From(Guid i)
		{
			return new GjennomforingssystemUserId(i.ToString());
		}

		public static GjennomforingssystemUserId Create()
		{
			return From(Guid.NewGuid());
		}

		public override string ToString()
		{
			return Value;
		}

		public override bool Equals(object obj)
		{
			if (obj is not GjennomforingssystemUserId)
				return false;

			GjennomforingssystemUserId other = (GjennomforingssystemUserId)obj;
			return Value == other.Value;
		}

		public override int GetHashCode()
		{
			return (Value != null ? Value.GetHashCode() : 0);
		}

		public static bool operator ==(GjennomforingssystemUserId left, GjennomforingssystemUserId right)
		{
			return left.Value == right.Value;
		}

		public static bool operator !=(GjennomforingssystemUserId left, GjennomforingssystemUserId right)
		{
			return left.Value != right.Value;
		}

		public static bool TryParse(string s, out GjennomforingssystemUserId id)
		{
			var isGuid = Guid.TryParse(s, out _);
			var isIdNumber = IdNummer.IsValid(s);

			if (!isGuid && !isIdNumber)
			{
				id = default;
				return false;
			}

			id = From(s);
			return true;
		}
	}
}

```